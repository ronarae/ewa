package app.rest;

import app.models.*;
import app.repositories.JeansJPARepository;
import app.repositories.OrderJPARepository;
import app.repositories.UserJPARepository;
import app.services.StorageException;
import app.services.StorageService;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @Autowired
    private JeansJPARepository jeansRepo;

    @Autowired
    private OrderJPARepository orderRepo;

    @Autowired
    private UserJPARepository userRepo;

    @PostMapping("/upload")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) throws StorageException, IOException {
//        String fileName = storageService.storeFile(file);
//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/downloadFile/")
//                .path(fileName)
//                .toUriString();
//                return new UploadFileResponse(fileName, fileDownloadUri,
//                (file).getContentType(), (file).getSize());
        ArrayList<String> resultList = readFile(file);
        if (resultList != null) {
            createOrder(resultList);
        }
        return null;
    }


    public ArrayList<String> readFile(MultipartFile file) throws IOException {
        String[][] data = null;
        ArrayList<String> list = null;
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();

        File currentFile = new File(file.getOriginalFilename());
        try {
            // Create a file input stream to read Excel workbook and worksheet
            FileInputStream xlfile = new FileInputStream(currentFile);

            // finds the workbook instance for XLSX file
            XSSFWorkbook xlwb = new XSSFWorkbook(xlfile);

            // return first sheet of workbook
            XSSFSheet xlSheet = xlwb.getSheetAt(0);

            // Get the number of rows and columns
            int numRows = xlSheet.getLastRowNum() + 1;
            int numCols = xlSheet.getRow(1).getLastCellNum();

            // Create double array data table - rows x cols
            // We will return this data table
            data = new String[numRows][numCols];

            // For each row, create a XSSFRow, then iterate through the "columns"
            // For each "column" create an XSSFCell to grab the value at the specified cell (i,j)
            // Start at 1 since the excel file always starts at row 2
            for (int i = 1; i < numRows; i++) {
                XSSFRow xlRow = xlSheet.getRow(i);
                for (int j = 0; j < numCols; j++) {
                    // Try catch, if the cell value is null, it will add an empty string into the array
                    try {
                        XSSFCell xlCell = xlRow.getCell(j);
                        data[i][j] = xlCell.toString();
                    } catch (Exception e) {
                        data[i][j] = "";
                    }
                }
            }
            list = formatArray(data);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    public ArrayList<String> formatArray(String[][] array) {
        ArrayList<String> list = new ArrayList<>();
        // Start from 2 first two rows are unnecessary
        for (int i = 2; i < array.length; i++) {
            // If array does not contain "-", continue
            if (!array[i][0].contains("-")) {
                continue;
            }

            // Get column A - Productcode
            list.add(array[i][0]);

            // Get Column Q - Total Sold
            if (array[i][16].trim().equals("")) {
                list.add("0.0");
            } else {
                list.add(array[i][16]);
            }

            // Get Column R - Current Stock
            list.add(array[i][17]);
        }

        return list;
    }

    public Order createOrder(ArrayList<String> list) {
        // Get all administrators.
        List<User> reviewers = userRepo.findByQuery("user_find_by_role", "admin");

        // Remove system from administrators list and save it to a usable variable.
        User system = reviewers.remove(0);

        // Create random for assigning a random administrator to the order (system has been removed as a reviewer).
        Random rand = new Random();
        User reviewer = reviewers.get(rand.nextInt(reviewers.size()));

        Order order = new Order(system, reviewer, "Pending", "Automatic generation", LocalDate.now());
        Order savedOrder = orderRepo.save(order);
        orderRepo.flush();

        Map<String, Integer> toOrder = calculateAllToOrder(list);

        System.out.println("SavedOrder: " + savedOrder.getOrderId());
        addToOrder(savedOrder, toOrder);
        return order;
    }

    public void addToOrder(Order order, Map<String, Integer> toOrder) {
        for(String key : toOrder.keySet()) {
            Jeans j = jeansRepo.find(key);
            OrderJean newOrder = new OrderJean(order, j, toOrder.get(key));
            orderRepo.save(newOrder);
        }
    }

    public Map<String, Integer> calculateAllToOrder(ArrayList<String> list) {
        Map<String, Integer> totalSoldPerType = calculateTotal(list, 1);
        Map<String, Integer> toOrder = new HashMap<>();

        for (int i = 0; i < list.size(); i += 3) {
            String productCode = list.get(i);
            if (jeansRepo.find(productCode) == null) {
                System.out.println("Product code not in DB: " + productCode);
                continue;
            }
            if (!jeansRepo.shouldOrderJean(productCode)) {
                continue;
            }

            int soldPerJeanSize = (int) Double.parseDouble(list.get(i + 1));
            int stockPerJean = (int) Double.parseDouble(list.get(i + 2));
            int totalSold = totalSoldPerType.get(productCode.split("-", 2)[0]);

            // calculate percentage
            double percentage = Math.ceil(((double) soldPerJeanSize / (double) totalSold) * 100);
            int totalToOrder = (int) ((percentage / 100) * totalSold) - stockPerJean;
            if (totalToOrder > 0) {
                toOrder.put(productCode, totalToOrder);
            }
        }

        return toOrder;
    }

    public Map<String, Integer> calculateTotal(ArrayList<String> list, int loopadder) {
        HashMap<String, Integer> toReturn = new HashMap();
        int index = 0;
        do {
            // Split the productcode
            String currentJeanCode = list.get(index).split("-", 2)[0];
            int totalNumber = 0;

            for (int i = index; i < list.size(); i += 3) {
                if (list.get(i).contains(currentJeanCode)) {
                    totalNumber += (int) Double.parseDouble(list.get(i + loopadder));
                    index = i;
                }
            }

            toReturn.put(currentJeanCode, totalNumber);

            index += 3;
        } while (index < list.size());

        return toReturn;
    }
}