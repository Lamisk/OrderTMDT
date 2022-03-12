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

	public void save(OrderItem obj) {
		repo.save(obj);
	}
	
	public List<OrderItem> listAll(){
		return repo.findAll();
	}
	
//	public List<Product> listAllProduct(){
//		return repo.findAllProduct();
//	}
	
//	public List<Customer> listAllCustomer(){
//		return repo.findAllCustomer();
//	}
}
