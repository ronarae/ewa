package app.models;

import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.Column;

@Entity
public class Jeans {
    @Id
    @Column
    private String productCode;
    @Column
    private String description;
    @Column
    private String season;
    @Column
    private String fabric;

    public Jeans(){}

    public Jeans(String productCode, String description, String season, String fabric) {
        this.productCode = productCode;
        this.description = description;
        this.season = season;
        this.fabric = fabric;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getFabric() { return fabric; }

    public void setFabric(String fabric) {
        this.fabric = fabric;
    }
}
