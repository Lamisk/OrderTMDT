package demo.mock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.mock.model.OrderItem;
import demo.mock.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository repo;


	public OrderItem get(int id) {
//		return repo.getById(id);
		return repo.findById(id).get();
		
	}
	
	public void save(OrderItem obj) {
		repo.save(obj);
	}

	public List<OrderItem> listAll() {
		return repo.findAll();
	}

	public void deleteById(Integer id) {
		repo.deleteById(id);
	}
	
	public void updateQuantityAndStatusById(Integer quantity, Integer o_id, Integer s_id) {
		repo.updateQuantityAndStatusById(quantity, o_id,s_id);
	}
	
	public OrderItem selectByID(Integer id) {
		return repo.selectByID(id);
	}
//	public List<Product> listAllProduct(){
//		return repo.findAllProduct();
//	}

//	public List<Customer> listAllCustomer(){
//		return repo.findAllCustomer();
//	}
}
