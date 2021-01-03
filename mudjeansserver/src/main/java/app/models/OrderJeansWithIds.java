package app.models;

public class OrderJeansWithIds {
    private int id_order;
    private String productCode;
    private int quantity;
    public OrderJeansWithIds(int id_order, String productCode, int quantity) {
        this.id_order = id_order;
        this.productCode = productCode;
        this.quantity = quantity;
    }

    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
        this.id_order = id_order;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
