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
import org.springframework.web.bind.annotation.RequestParam;

import demo.mock.model.Product;
import demo.mock.service.ProductService;

@Controller
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping("/")
	public String index(Model model) throws Exception {

		return "product/list";
	}

	@GetMapping("/list")
	public String list(Model model) throws Exception {
		List<Product> products = productService.listAll();
		model.addAttribute("title", "List product");
		model.addAttribute("products", products);
		model.addAttribute("backto", "product/list");

		return "product/list";
	}

//	@GetMapping("/list")
//	@ResponseBody
//	public List<Product> list(Model model) throws Exception {
//		List<Product> products = productService.listAll();
////		model.addAttribute("title", "List product");
////		model.addAttribute("products", products);
////		model.addAttribute("backto", "product/list");
////
//		return products;
//	}

//	@GetMapping("/list/{id}")
//	public String detail(Model model, @PathVariable("id") Integer id) throws Exception {
//
//		Product product = productService.get(id);
//		System.out.println(product);
//		if (product == null) {
//			throw new ProductNotFoundException();
//		}
//
////		model.addAttribute("title", "List product");
////		model.addAttribute("products", products);
//		model.addAttribute("backto", "product/list");
//
//		return "product/detail";
//	}

	@GetMapping("/add")
	public String showAdd(Model model) throws Exception {

		model.addAttribute("title", "Add product");
		model.addAttribute("backto", "product/list");

		return "product/add";
	}

	@PostMapping("/add")
	public ResponseEntity<String> add(Model model, HttpServletRequest request) throws Exception {
		try {
			String name = (String) request.getParameter("name");
			String des = (String) request.getParameter("des");
			Long price = Long.parseLong(request.getParameter("price"));
//			String code = (String) request.getParameter("code");
//			System.out.println("CODE get: " + code);
//			if (code == "") {
//				code = null;
//			}
//			if (code != null) {
//				code = code.trim();
//				if (code == "") {
//					code = null;
//				}
//			}
//			if (code!=null)
//			{
//				if (productService.findExactlyByCode(code) != null) {
//					return new ResponseEntity<>("Duplicate code", HttpStatus.NOT_ACCEPTABLE);
//
//				}
//			}
//			System.out.println("CODE trim: " + code);
//			while (code == null) {
//				code = Ultil.getInstance().genCode();
//				if (productService.findExactlyByCode(code) != null) {
//					code = null;
//				}
//
//			}

//			System.out.println("CODE gen : " + code);
//			System.out.println("CODE set: " + code);
			Product product = new Product();

			product.setDes(des);
			product.setName(name);
			product.setPrice(price);
//		System.out.println(product);
			productService.save(product);
			return new ResponseEntity<>("Success add this product", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("Failed add this product", HttpStatus.NOT_ACCEPTABLE);
		}
//		return "redirect:/product/add";
	}

	@GetMapping("/edit")
	public String edit(Model model) throws Exception {
		List<Product> products = productService.listAll();
		model.addAttribute("title", "Edit product");
		model.addAttribute("products", products);
		model.addAttribute("backto", "product/list");

		return "product/edit";
	}

//	C1: cach nay pass doi so vao url
	@DeleteMapping("edit/{id}")
	public ResponseEntity<String> delete(Model model, @PathVariable("id") int productID) throws Exception {

		try {
			productService.deleteById(productID);
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
			String des = data.getFirst("des");
//			String code = data.getFirst("code");
//			System.out.println(data.getFirst("price"));
			Long price = Long.parseLong(data.getFirst("price"));
			Product product = productService.get(Integer.parseInt(id));

			product.setDes(des);
			product.setName(name);
			product.setPrice(price);
//			product.setCode(code);
			productService.save(product);

			return new ResponseEntity<>("Successfully updated", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>("Failed updated", HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@PostMapping(value = "/list")
	public String search(Model model, @RequestParam(value = "name_search") String name_search) throws Exception {

		if (name_search != null) {
			List<Product> products = productService.findAllByName(name_search);

			model.addAttribute("title", "List product");
			model.addAttribute("products", products);
		}
		model.addAttribute("backto", "product/list");

		return "/product/list";
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
