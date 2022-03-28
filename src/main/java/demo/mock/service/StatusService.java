package demo.mock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.mock.model.Status;
import demo.mock.repository.StatusRepository;

@Service
public class StatusService {
	@Autowired
	private StatusRepository repo;
	
	public Status get(int id) {
		return repo.getById(id);
	}
	
	public Status findByName(String name) {
		return repo.findByName(name);
	}
	
	public List<Status> findAll() {
		return repo.findAll();
	}
	
	public void save(Status status) {
		repo.save(status);
	}
	
}
