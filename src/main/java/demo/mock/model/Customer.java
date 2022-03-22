package demo.mock.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

@Entity
@Table
//https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
//^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$

///^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/

public class Customer {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

//	@Column(length = 8, unique = true)
//	private String code;

	@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)+$", message = "Name contain special charater")
	@NotNull(message = "Not null")
	@Size(min = 2, max = 30, message = "Name 2 to 30 charaters")
	private String name;
	@NotNull(message = "Not null")
	@Column(length = 100)
	@Size(min = 2, max = 100, message = "Address 2 to 100 charaters")
	@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z0-9,]+)+$", message = "Address contain special charaters")
	private String address;

	@Column(length = 10, unique = true)
	@Pattern(regexp = "^[0-9]+$", message = "Phone contain non-numeric")
	 @Length(min = 10, max = 10,message = "Length of phone must be 10")
	private String phone;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	private Date birthday;

	@OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
//	@OnDelete(action = OnDeleteAction.CASCADE)
	private Set<OrderItem> orderItems = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
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

	public Set<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

	public Customer() {
		super();
	}

	public Customer(Integer id,
			@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)+$", message = "Name contain special charater") @NotNull(message = "Not null") @Size(min = 2, max = 30, message = "Name 2 to 30 charaters") String name,
			@NotNull(message = "Not null") @Size(min = 2, max = 100, message = "Address 2 to 100 charaters") @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z0-9,]+)+$", message = "Address contain special charaters") String address,
			String phone, Gender gender, Date birthday) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.gender = gender;
		this.birthday = birthday;
	}

	public Customer(
			@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)+$", message = "Name contain special charater") @NotNull(message = "Not null") @Size(min = 2, max = 30, message = "Name 2 to 30 charaters") String name,
			@NotNull(message = "Not null") @Size(min = 2, max = 100, message = "Address 2 to 100 charaters") @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z0-9,]+)+$", message = "Address contain special charaters") String address,
			String phone, Gender gender, Date birthday) {
		super();
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.gender = gender;
		this.birthday = birthday;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", name=" + name + ", address=" + address + ", phone=" + phone + ", gender="
				+ gender + ", birthday=" + birthday + "]";
	}

	public Customer(
			@Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)+$", message = "Name contain special charater") @NotNull(message = "Not null") @Size(min = 2, max = 30, message = "Name 2 to 30 charaters") String name,
			@NotNull(message = "Not null") @Size(min = 2, max = 100, message = "Address 2 to 100 charaters") @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z0-9,]+)+$", message = "Address contain special charaters") String address,
			@Pattern(regexp = "^[0-9]+$", message = "Phone contain non-numeric") String phone, Gender gender,
			Date birthday, Set<OrderItem> orderItems) {
		super();
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.gender = gender;
		this.birthday = birthday;
		this.orderItems = orderItems;
	}

}
