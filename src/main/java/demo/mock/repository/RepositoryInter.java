package demo.mock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

//THem annotaion o day gay ra loi
@NoRepositoryBean
public interface RepositoryInter<R, T> extends JpaRepository<R, T> {

	public R findByName(String name);
	

	public List<R> findAllByName(String name);

//	public List<R> findAllByCode(String code);
//	public R findByCode(String code);
	
	public List<R> findByNameContains(String name);
}
