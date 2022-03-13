package demo.mock.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import demo.mock.model.Customer;
import demo.mock.model.OrderItem;
import demo.mock.model.Product;
import demo.mock.service.CustomerService;
import demo.mock.service.OrderService;
import demo.mock.service.ProductService;

@Controller
@RequestMapping("/order")
public class OrderController {
	@Autowired
	private OrderService orderSerive;
	@Autowired
	private ProductService productService;
	@Autowired
	private CustomerService customerService;

	@GetMapping(value = { "/add/{precode}", "/add" })
	public String add_get(Model model, HttpServletRequest request,
			@PathVariable(value = "precode", required = false) String code) throws Exception {

		if (code == null) {
			code = "";
		}
		model.addAttribute("precode", code);
		List<Product> products = productService.listAll();
		List<Customer> customers = customerService.listAll();
		model.addAttribute("customers", customers);
		model.addAttribute("products", products);
		model.addAttribute("title", "Add order");
		model.addAttribute("backto", "order/list");
		return "order/add";
	}

	@PostMapping("/add")
	public ResponseEntity<String> add(Model model, HttpServletRequest request) throws Exception {

		try {
			Integer product_id = Integer.parseInt(request.getParameter("product_id"));
			Integer customer_id = Integer.parseInt(request.getParameter("customer_id"));
			Integer quantity = Integer.parseInt(request.getParameter("quantity"));
//			System.out.println(product_id+" "+customer_id+" "+quantity);
			Product product = productService.get(product_id);
			Customer customer = customerService.get(customer_id);

			OrderItem orderItem = new OrderItem();
			orderItem.setCustomer(customer);
			orderItem.setProduct(product);
			orderItem.setQuantity(quantity);
			orderItem.setTotal(quantity * product.getPrice());
			orderSerive.save(orderItem);
			model.addAttribute("backto", "order/list");
			return new ResponseEntity<>("Successfully add order", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("Failed add order", HttpStatus.NOT_ACCEPTABLE);
		}

	}

	@GetMapping("/list")
	public String list(Model model) throws Exception {
		List<OrderItem> orderItems = orderSerive.listAll();
		model.addAttribute("backto", "order/list");
		model.addAttribute("title", "List order");
		model.addAttribute("orderItems", orderItems);
		return "order/list";
	}

	@GetMapping("/edit")
	public String edit(Model model) throws Exception {
		List<OrderItem> orderItems = orderSerive.listAll();
		model.addAttribute("backto", "order/list");
		model.addAttribute("title", "Edit order");
		model.addAttribute("orderItems", orderItems);
		return "order/edit";
	}

	@DeleteMapping("edit/{id}")
	public ResponseEntity<String> delete(Model model, @PathVariable("id") int orderID) throws Exception {

		try {
			orderSerive.deleteById(orderID);
			return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed deleted", HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@RequestMapping(value = "/edit", method = RequestMethod.PATCH)
	public ResponseEntity<String> update(@RequestBody MultiValueMap<String, String> data) throws Exception {

		try {
			String id = data.getFirst("id");
			
			int quantity = Integer.parseInt(data.getFirst("quantity"));
			System.out.println(id+" "+quantity);
			OrderItem orderItem = orderSerive.get(Integer.parseInt(id));
			System.out.println("BEFORE: " + orderItem);
//			orderItem.setQuantity(quantity);
//			Long total = quantity * orderItem.getProduct().getPrice();
//			orderItem.setTotal(total);
//
//			System.out.println(orderItem);
//			orderSerive.save(orderItem);

			return new ResponseEntity<>("Successfully updated", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>("Failed updated", HttpStatus.NOT_ACCEPTABLE);
		}
	}
}
