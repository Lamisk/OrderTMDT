package demo.mock.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Table
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

//	1 cart co the chua nhieu product
//	1 product chi thuoc ve 1 cart

	
//	Dat lai ten khoa khoa, 
//	mac dinh hibernate se gen ten khoa ngoai 
//	dua tren ten thuoc tinh
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

//	1 customer  co the co nhieu item duoc oerder
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customer;

	@Min(value = 0, message = "Min quantity is 0")
	@Max(value = 100, message = "Max quantity is 100 ")
	private int quantity;

	private Long total;

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	

	public OrderItem(Integer id, Product product, Long total) {
		super();
		this.id = id;
		this.product = product;
		this.total = total;
	}

	public OrderItem(
			@Min(value = 0, message = "Min quantity is 0") @Max(value = 100, message = "Max quantity is 100 ") int quantity,
			Long total) {
		super();
		this.quantity = quantity;
		this.total = total;
	}

	public OrderItem() {
		super();
	}

	@Override
	public String toString() {
		return "OrderItem [id=" + id + ", quantity=" + quantity + ", total=" + total + "]";
	}

	

}
