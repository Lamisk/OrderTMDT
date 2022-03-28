package demo.mock.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import demo.mock.model.OrderItem;

@Repository
public interface OrderRepository extends JpaRepository<OrderItem, Integer> {
	@Transactional
	@Modifying
//	@Query("update OrderItem o set o.quantity= :quantity , o.status.id = :s_id , o.total= :total where o.id= :o_id")
//	void updateQuantityAndStatusById(@Param("quantity") Integer quantity, @Param("o_id") Integer o_id, @Param("s_id") Integer s_id, @Param("total") Long total);
	@Query("update OrderItem o set o.quantity= :quantity , o.status.id = :s_id where o.id= :o_id")
	void updateQuantityAndStatusById(@Param("quantity") Integer quantity, @Param("o_id") Integer o_id, @Param("s_id") Integer s_id);
	@Transactional

	@Query("from OrderItem o where o.id= :o_id")
	OrderItem selectByID( @Param("o_id") Integer o_id);
}
