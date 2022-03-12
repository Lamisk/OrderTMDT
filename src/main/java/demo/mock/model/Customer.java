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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table
//https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
//^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$

///^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/

public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 8, unique = true)
	private String code;
	@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)+$", message = "Name contain special charater")
	@NotNull(message = "Not null")
	@Size(min = 2, max = 30, message = "Name 2 to 30 charaters")
	private String name;
	@NotNull(message = "Not null")
	@Column(length = 100)
	@Size(min = 2, max = 100, message = "Address 2 to 100 charaters")
	@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z0-9,]+)+$", message = "Address contain special charaters")
	private String address;

	@OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
//	@OnDelete(action = OnDeleteAction.CASCADE)
	private Set<OrderItem> orderItems = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Customer(Integer id, String code, String name, String address) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
		this.address = address;
	}

	public Customer(String code, String name, String address) {
		super();

		this.code = code;
		this.name = name;
		this.address = address;
	}

	public Customer() {
		super();
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", code=" + code + ", name=" + name + ", address=" + address + "]";
	}

}
