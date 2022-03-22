package demo.mock.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
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
import org.springframework.web.bind.annotation.RequestParam;

import demo.mock.model.Customer;
import demo.mock.model.Gender;
import demo.mock.service.CustomerService;

@Controller
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	@GetMapping("/")
	public String index(Model model) throws Exception {

		return "customer/list";
	}

	@GetMapping("/list")
	public String list(Model model) throws Exception {
		List<Customer> customers = customerService.listAll();
		model.addAttribute("title", "List customer");
		model.addAttribute("customers", customers);
		model.addAttribute("backto", "customer/list");

		return "customer/list";
	}

//	@GetMapping("/list/{id}")
//	public String detail(Model model, @PathVariable("id") Integer id) throws Exception {
//
//		Customer customer = customerService.get(id);
//		System.out.println(customer);
//		if (customer == null) {
//			throw new CustomerNotFoundException();
//		}
//
////		model.addAttribute("title", "List customer");
////		model.addAttribute("customers", customers);
//		model.addAttribute("backto", "customer/list");
//
//		return "customer/detail";
//	}

	@GetMapping("/add")
	public String showAdd(Model model) throws Exception {

		model.addAttribute("title", "Add customer");
		model.addAttribute("backto", "customer/list");

		return "customer/add";
	}

	@PostMapping("/add")
	public ResponseEntity<String> add(Model model, HttpServletRequest request) throws Exception {

		try {
			String name = (String) request.getParameter("name");
			String address = (String) request.getParameter("address");
			String gender = (String) request.getParameter("gender");
			String phone = (String) request.getParameter("phone");
			String str_birthday = (String) request.getParameter("birthday");
			SimpleDateFormat formaDate = new SimpleDateFormat("yyyy-MM-dd");
			Date birthday = new java.sql.Date(formaDate.parse(str_birthday).getTime());
//			String code = null;
//
//			do {
//				code = Ultil.getInstance().genCode();
//
//			} while (customerService.findExactlyByCode(code) != null);

//			System.out.println("gender: " + gender);
//			System.out.println("GENDER: " + Gender.getGenderByAlias(gender));
			Customer customer = new Customer();
//			customer.setCode(code);
			customer.setAddress(address);
			customer.setName(name);
			customer.setGender(Gender.getGenderByAlias(gender));
			customer.setPhone(phone);
			customer.setBirthday(birthday);
			customerService.save(customer);
			return new ResponseEntity<>("Success add this customer", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("Failed add this customer", HttpStatus.NOT_ACCEPTABLE);
		}

//		return "redirect:/customer/add";
	}

	@GetMapping("/edit")
	public String edit(Model model) throws Exception {
		List<Customer> customers = customerService.listAll();
		model.addAttribute("title", "Edit customer");
		model.addAttribute("customers", customers);
		model.addAttribute("backto", "customer/list");

		return "customer/edit";
	}

//	C1: cach nay pass doi so vao url
	@DeleteMapping("edit/{id}")
	public ResponseEntity<String> delete(Model model, @PathVariable("id") int customerID) throws Exception {

		try {
			customerService.deleteById(customerID);
			return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed deleted", HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@RequestMapping(value = "/edit", method = RequestMethod.PATCH)
	public ResponseEntity<String> update(@RequestBody MultiValueMap<String, String> data) throws Exception {

		try {
			String id = data.getFirst("id");
			String name = data.getFirst("name");
			String address = data.getFirst("address");
			String gender = (String) data.getFirst("gender");
			String phone = (String) data.getFirst("phone");
			String str_birthday = (String) data.getFirst("birthday");
			SimpleDateFormat formaDate = new SimpleDateFormat("yyyy-MM-dd");
			Date birthday = new java.sql.Date(formaDate.parse(str_birthday).getTime());

			Customer customer = customerService.get(Integer.parseInt(id));

			customer.setAddress(address);
			customer.setName(name);
			customer.setGender(Gender.getGenderByAlias(gender));
			customer.setPhone(phone);
			customer.setBirthday(birthday);
			customerService.save(customer);

			return new ResponseEntity<>("Successfully updated", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>("Failed updated", HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@PostMapping(value = "/list")
	public String search(Model model, @RequestParam(value = "name_search") String name_search) throws Exception {

		if (name_search != null) {
			List<Customer> customers = customerService.findAllByName(name_search);

			model.addAttribute("title", "List customer");
			model.addAttribute("customers", customers);
		}
		model.addAttribute("backto", "customer/list");

		return "/customer/list";
	}

//	@RequestMapping(value = "/ioException")
//	public String testIOException() throws IOException {
//		throw new IOException("this is io exception");
//	}
//
//	@RequestMapping(value = "/exception")
//	public String tesException() throws Exception {
//		throw new IOException("this is  exception");
//	}
}
