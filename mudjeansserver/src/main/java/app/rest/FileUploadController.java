package app.rest;

import app.models.Order;
import app.models.UploadFileResponse;
import app.services.StorageException;
import app.services.StorageService;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.yaml.snakeyaml.util.ArrayUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.apache.poi.xssf.usermodel.XSSFWorkbookType.XLSX;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileUploadController {

    @Autowired
    private StorageService storageService;

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
            for (int i = 0; i <list.size() ; i++) {
                System.out.println(list.get(i));
            }
//            System.out.println(list);
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

        for (int i = 0; i < (list.size() / 3); i++) {
            System.out.println("total sold: " + calculateTotalSold(list, 0));
//          System.out.println(list.get(63));
//            System.out.println("total sold: " + calculateTotalSold(list, 63));
//            System.out.println(i + 1);
        }
        return list;
    }

    public Order createOrder(ArrayList<String> list) {
        Order order = new Order();

        // Totaal berekenen


        return null;
    }

    public int calculateTotalSold(ArrayList<String> list, int index) {
        // Split the productcode
        String currentJeanCode = list.get(index).split("-", 2)[0];
        int totalSoldPerJean = 0;
        // Loop through list
        for (int i = 0; i < list.size(); i++) {
            // Check if it is the same jean (jeans are paired by 3)
            if (i % 3 == 0) {
                // Check if productcodes are similar
                if (list.get(i).contains(currentJeanCode)) {
                    // Add up all the sold jeans
                    totalSoldPerJean += Double.parseDouble(list.get(i + 1));
                }
            }
        }
        return totalSoldPerJean;
    }

    public int calculateTotalStock(ArrayList<String> list, int index) {
        // Split the productcode
        String currentJeanCode = list.get(index).split("-", 2)[0];
        int totalStockPerJean = 0;
        // Loop through list
        for (int i = 0; i < list.size(); i++) {
            // Check if it is the same jean (jeans are paired by 3)
            if (i % 3 == 0) {
                // Check if productcodes are similar
                if (list.get(i).contains(currentJeanCode)) {
                    // Add up all the jeans stock
                    totalStockPerJean += Double.parseDouble(list.get(i + 1));
                }
            }
        }
        return totalStockPerJean;
    }


}
