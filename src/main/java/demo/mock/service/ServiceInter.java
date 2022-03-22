package demo.mock.service;

import java.util.List;

public interface ServiceInter<T> {
	public List<T> listAll();

	public T get(int id);

	public void delete(T obj);

	public void deleteById(int id);

	public void save(T obj);

//	public List<T> findAllByCode(String code);
//
//	public T findExactlyByCode(String code);

//	public List<T> findRelativeByCode(String code_part);
	
	public List<T> findAllByName(String name);
//
//	public T findExactlyByCode(String code);

//	public List<T> findRelativeByCode(String code_part);

	
}
