package demo.mock.repository;

import org.springframework.stereotype.Repository;

import demo.mock.model.Status;
@Repository
public interface StatusRepository extends RepositoryInter<Status, Integer> {
	
}
