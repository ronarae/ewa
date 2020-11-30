package app.models;

import org.springframework.context.annotation.Primary;

import javax.persistence.*;

@Entity
public class JeansStock {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_gen")
    @SequenceGenerator(name = "id_gen", sequenceName = "id_seq", initialValue = 1, allocationSize = 1)
    private int stockId;
    private int month;
    private int currentStock;
    private int soldStock;

    @ManyToOne
    private Jeans jeans;

    public JeansStock() {}

    public JeansStock(int stockId, int month, int currentStock, int soldStock) {
        this.stockId = stockId;
        this.month = month;
        this.currentStock = currentStock;
        this.soldStock = soldStock;
    }

    public int getStockId() {
        return stockId;
    }

    public void setStockId(int stockId) {
        this.stockId = stockId;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(int currentStock) {
        this.currentStock = currentStock;
    }

    public int getSoldStock() {
        return soldStock;
    }

    public void setSoldStock(int soldStock) {
        this.soldStock = soldStock;
    }
}
