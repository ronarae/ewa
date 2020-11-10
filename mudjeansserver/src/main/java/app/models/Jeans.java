package app.models;

public class Jeans {
    private String productCode;
    private String description;
    private int stock;
    private int sold;
    private String season;

    public Jeans(){}

    public Jeans(String productCode, String description, int stock, int sold, String season) {
        this.productCode = productCode;
        this.description = description;
        this.stock = stock;
        this.sold = sold;
        this.season = season;
    }

    public boolean updateStock(int sold) {
        if (sold > stock || stock < 1) {
            return false;
        }

        stock -= sold;
        this.sold += sold;
        return true;
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

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
