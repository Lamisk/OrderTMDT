package demo.mock.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

//	@Column(length = 8, unique = true)
//	@Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Code contain special charater or space")
//	private String code;

	@Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Address contain special charater")
	@NotNull(message = "Not null")
	@Size(min = 2, max = 30, message = "Address 2 to 30 charaters")
	private String name;
	@NotNull(message = "Name not null")
	@Column(columnDefinition = "TEXT")
	private String des;

	@NotNull(message = "Price ot null")
	@Min(value = 0, message = "Min price is 0")
	@Max(value = 100000000, message = "Max price is 100000000")
	private Long price;

	@OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
//	@OnDelete(action = OnDeleteAction.CASCADE)
	private Set<OrderItem> orderItems = new HashSet<>();

	public Set<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Product() {
		super();
	}

	public Product(Integer id,
			@Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Address contain special charater") @NotNull(message = "Not null") @Size(min = 2, max = 30, message = "Address 2 to 30 charaters") String name,
			@NotNull(message = "Name not null") String des,
			@NotNull(message = "Price ot null") @Min(value = 0, message = "Min price is 0") @Max(value = 100000000, message = "Max price is 100000000") Long price) {
		super();
		this.id = id;
		this.name = name;
		this.des = des;
		this.price = price;
	}

	public Product(
			@Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Address contain special charater") @NotNull(message = "Not null") @Size(min = 2, max = 30, message = "Address 2 to 30 charaters") String name,
			@NotNull(message = "Name not null") String des,
			@NotNull(message = "Price ot null") @Min(value = 0, message = "Min price is 0") @Max(value = 100000000, message = "Max price is 100000000") Long price) {
		super();
		this.name = name;
		this.des = des;
		this.price = price;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", des=" + des + ", price=" + price + "]";
	}

	public Product(
			@Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Address contain special charater") @NotNull(message = "Not null") @Size(min = 2, max = 30, message = "Address 2 to 30 charaters") String name,
			@NotNull(message = "Name not null") String des,
			@NotNull(message = "Price ot null") @Min(value = 0, message = "Min price is 0") @Max(value = 100000000, message = "Max price is 100000000") Long price,
			Set<OrderItem> orderItems) {
		super();
		this.name = name;
		this.des = des;
		this.price = price;
		this.orderItems = orderItems;
	}

	
	
	
	
}
