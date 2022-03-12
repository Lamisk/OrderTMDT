package demo.mock.repository;

import org.springframework.stereotype.Repository;

import demo.mock.model.Customer;

//@Repository
//public interface CustomerRepository extends JpaRepository<Customer, Integer> {
//	public Customer findByName(String name);
//
//	public List<Customer> findAllByName(String name);
//}

@Repository
public interface CustomerRepository extends RepositoryInter<Customer, Integer> {
	
}
