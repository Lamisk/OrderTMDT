package demo.mock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import demo.mock.model.OrderItem;

@Repository
public interface OrderRepository extends JpaRepository<OrderItem, Integer> {
//	List<Product> findAllProduct();
//
//	List<Customer> findAllCustomer();
}
