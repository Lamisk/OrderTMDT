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
import demo.mock.model.Status;
import demo.mock.service.CustomerService;
import demo.mock.service.OrderService;
import demo.mock.service.ProductService;
import demo.mock.service.StatusService;

@Controller
@RequestMapping("/order")

public class OrderController {
	@Autowired
	private OrderService orderSerive;
	@Autowired
	private ProductService productService;
	@Autowired
	private CustomerService customerService;

	@Autowired
	private StatusService statusService;

	@GetMapping(value = { "/add/{p_id}", "/add" })
	public String add_get(Model model, HttpServletRequest request,
			@PathVariable(value = "p_id", required = false) String p_id) throws Exception {

		if (p_id == null) {
			p_id = "";
		} else {

			int product_id = Integer.parseInt(p_id);
			String p_name = productService.get(product_id).getName();
			if (p_name != null) {
				model.addAttribute("p_name", p_name);
			} else {
				model.addAttribute("p_name", p_name);
			}

		}

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
			Status status = statusService.findByName("pending");
			if (status == null) {
				status = new Status("pending");
				statusService.save(status);
			}

			OrderItem orderItem = new OrderItem();
			orderItem.setCustomer(customer);
			orderItem.setProduct(product);
			orderItem.setQuantity(quantity);
//			orderItem.setTotal(quantity * product.getPrice());
			orderItem.setStatus(status);
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
			int o_id = Integer.parseInt(id);
			int quantity = Integer.parseInt(data.getFirst("quantity"));
			int status_id = Integer.parseInt(data.getFirst("status_id"));
			
//			int q  = orderSerive.get(o_id).getQuantity();
//			System.out.println(q);
			OrderItem o = orderSerive.get(o_id);
			o.setQuantity(quantity);
			o.getStatus().setId(status_id);
			orderSerive.save(o);
//			Status s = new Status();
//			s.setId(status_id);
//			o.setStatus(s);
//			orderSerive.save(o);
//			List<OrderItem> orders = orderSerive.listAll();
//			for (OrderItem o: orders) {
//				System.out.println(o.getId());
//				System.out.println(o.getQuantity());
//				System.out.println(o.getCustomer().getName());
//				System.out.println(o.getProduct().getName());
//				System.out.println(o.getStatus().getName());
//				System.out.println();
//			}
		
//			OrderItem orderItem = orderSerive.selectByID(o_id);
//			System.out.println("INFO:" + orderItem.getQuantity());
//			
//			Long total = orderItem.getTotal() /  orderItem.getQuantity() * quantity;
//			
//			orderSerive.updateQuantityAndStatusById(quantity, o_id, status_id);
//			
//			System.out.println(id + " " + quantity);
//			OrderItem orderItem = orderSerive.get(o_id);
//			System.out.println("Order id: "+o_id);
//			System.out.println("Quantity: "+orderItem.getQuantity());
//			orderItem.setQuantity(quantity);
//			orderSerive.save(orderItem);

			return new ResponseEntity<>("Successfully updated", HttpStatus.OK);
		} catch (Exception e) {
			
			e.printStackTrace();

			return new ResponseEntity<>("Failed updated", HttpStatus.NOT_ACCEPTABLE);
		}
	}
}
