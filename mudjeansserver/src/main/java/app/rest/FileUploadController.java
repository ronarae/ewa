package app.rest;

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

import java.io.*;
import java.util.Iterator;

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
        readFile(file);
        return null;

    }


    public String[][] readFile(MultipartFile file) throws IOException {
        String[][] data = null;

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
                    try{
                        XSSFCell xlCell = xlRow.getCell(j);
                        data[i][j] = xlCell.toString();
                    }catch (Exception e){
                        data[i][j] = "";
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return data;
    }

    public void deleteRow(int row, String[][] array, int deleteCount) {
//        array.splice(row, deleteCount);
    }

    public void deleteCol(int row, int col, String[][] array, int deleteCount) {
//        array[row].splice(col, deleteCount);
    }


}
