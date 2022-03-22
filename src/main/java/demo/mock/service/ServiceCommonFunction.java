package demo.mock.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import demo.mock.repository.RepositoryInter;

public class ServiceCommonFunction<T> implements ServiceInter<T> {
	@Autowired
	private RepositoryInter<T, Integer> repo;

	@Override
	public List<T> listAll() {
		return repo.findAll();
	}

	@Override
	public T get(int id) {
		Optional<T> obj = repo.findById(id);
		if (obj.isPresent()) {
			return obj.get();
		}
		else {
			return null;
		}

	}

	@Override
	public void delete(T obj) {
		repo.delete(obj);
	}

	@Override
	public void deleteById(int id) {
		repo.deleteById(id);

	}

	@Override
	public void save(T obj) {
		repo.save(obj);

	}

//	@Override
//	public List<T> findAllByCode(String code) {
//		return repo.findAllByCode(code);
//	}
//
//	@Override
//	public T findExactlyByCode(String code) {
//		return repo.findByCode(code);
//
//	}

	@Override
	public List<T> findAllByName(String name) {

		return repo.findByNameContains(name);
	}

}
