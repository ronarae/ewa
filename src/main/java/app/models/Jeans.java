package app.models;

import javax.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name = "find_all_general_types",
        query = "select j.mainCode, j.description from Jeans j"),

        @NamedQuery(name = "find_sizes_per_general_type",
        query = "select j from Jeans j where j.productCode like concat(:productCode, '%')")
})
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
    @Column
    private int latestStock;
    @Column
    private boolean shouldOrder;
    @Column
    private String mainCode;


    public Jeans(){}

    public Jeans(String productCode, String description, String season, String fabric, int latestStock) {
        this.productCode = productCode;
        this.description = description;
        this.season = season;
        this.fabric = fabric;
        this.latestStock = latestStock;
        this.shouldOrder = true;
        if (productCode.length() > 14) {
            this.mainCode = productCode.substring(14);
        }
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

    public int getLatestStock() {
        return latestStock;
    }

    public void setLatestStock(int latestStock) {
        this.latestStock = latestStock;
    }

    public boolean hasShouldOrder() {
        return shouldOrder;
    }

    public void setShouldOrder(boolean order) {
        this.shouldOrder = order;
    }

    public String getMainCode() {
        return mainCode;
    }

    public void setMainCode(String mainCode) {
        this.mainCode = mainCode;
    }
}
