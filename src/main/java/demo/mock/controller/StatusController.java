package demo.mock.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import demo.mock.model.Status;
import demo.mock.service.StatusService;

@Controller
@RequestMapping("/status")
public class StatusController {

	@Autowired
	private StatusService statusService;

	@GetMapping("/list")
	public ResponseEntity<String> list() {

//		Map<Integer, String> rtn = new LinkedHashMap<>();

		List<Status> statuses = statusService.findAll();
		Map<Integer, String> rtn = new LinkedHashMap<>();
		for (Status s : statuses) {
			rtn.put(s.getId(), s.getName());
		}
		// Displaying JSON String
		String jsonStr = new Gson().toJson(rtn);
//		System.out.println(jsonStr);
		return new ResponseEntity<>(jsonStr, HttpStatus.OK);

	}
}
