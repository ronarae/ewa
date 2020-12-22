package app.rest;

import app.models.UploadFileResponse;
import app.services.StorageException;
import app.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @PostMapping("/upload")
    public UploadFileResponse uploadFile(@RequestParam ("file")MultipartFile file) throws StorageException {
        String fileName = storageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                (file).getContentType(), (file).getSize());
    }



}
