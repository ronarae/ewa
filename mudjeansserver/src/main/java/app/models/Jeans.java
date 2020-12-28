package app.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity(name = "Jean")
@NamedQueries({
        @NamedQuery(name = "find_sizes_per_general_type",
                query = "select j from Jean j where j.productCode like concat(:productCode, '%')")
})
public class Jeans {
    @Id
    @Column
    private String productCode;
    @Column
    private String styleName;
    @Column
    private String fabric;
    @Column
    private String washing;
    @Column
    private String productCategory;
    @Column
    private int latestStock;
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    @JsonProperty
    private boolean shouldOrder;


    public Jeans() {
    }

    public Jeans(String productCode, String styleName, String fabric, String washing, String productCategory, int latestStock, boolean shouldOrder) {
        this.productCode = productCode;
        this.styleName = styleName;
        this.fabric = fabric;
        this.washing = washing;
        this.productCategory = productCategory;
        this.latestStock = latestStock;
        this.shouldOrder = shouldOrder;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getFabric() {
        return fabric;
    }

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

    public String getStyleName() {
        return styleName;
    }

    public void setStyleName(String styleName) {
        this.styleName = styleName;
    }

    public String getWashing() {
        return washing;
    }

    public void setWashing(String washing) {
        this.washing = washing;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }
}
