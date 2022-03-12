package demo.mock.repository;

import org.springframework.stereotype.Repository;

import demo.mock.model.Product;

//@Repository
//public interface CustomerRepository extends JpaRepository<Customer, Integer> {
//	public Customer findByName(String name);
//
//	public List<Customer> findAllByName(String name);
//}

@Repository
public interface ProductRepository extends RepositoryInter<Product, Integer> {
	
}
