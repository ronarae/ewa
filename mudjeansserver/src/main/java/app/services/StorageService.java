package app.services;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


public class StorageService {
    // pointing to the folder that will store the file
    private static final String storageLocation = "../../uploads";

    private Path fileStorageLocationObject;

    public StorageService() {
        this.fileStorageLocationObject = Paths.get(storageLocation).toAbsolutePath().normalize();
    }

    public String storeFile(MultipartFile file) throws StorageException {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocationObject.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new StorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }


}
