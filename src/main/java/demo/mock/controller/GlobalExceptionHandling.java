package demo.mock.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import demo.mock.exception.CustomerNotFoundException;

@ControllerAdvice(basePackages = "demo.mock.controller")
public class GlobalExceptionHandling {
	@ExceptionHandler(IOException.class)
	private ModelAndView processIOException(IOException ex) {
		ModelAndView model = new ModelAndView("template/error");
		model.addObject("errorMsg", ex.getMessage());
		return model;
	}

	public static final String DEFAULT_ERROR_VIEW = "template/error";

//	DOCS: https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc
	@ExceptionHandler(value = Exception.class)
	public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
		// If the exception is annotated with @ResponseStatus rethrow it and let
		// the framework handle it - like the OrderNotFoundException example
		// at the start of this post.
		// AnnotationUtils is a Spring Framework utility class.
		if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null)
			throw e;

		// Otherwise setup and send the user to a default error-view.
		ModelAndView mav = new ModelAndView();
		mav.addObject("exception", e);
		mav.addObject("cause", e.getCause());
		mav.addObject("message", e.getMessage());
		mav.addObject("url", req.getRequestURL());
		mav.addObject("title", "ERROR PAGE");
		mav.setViewName(DEFAULT_ERROR_VIEW);
		return mav;
	}

	@ExceptionHandler(value = CustomerNotFoundException.class)
	public ModelAndView customerNotFound(HttpServletRequest req, Exception e) throws Exception {

		// Otherwise setup and send the user to a default error-view.
		ModelAndView mav = new ModelAndView();
		mav.addObject("exception", e);
		mav.addObject("cause", e.getCause());
		mav.addObject("message", e.getMessage());
		mav.addObject("url", req.getRequestURL());
		mav.addObject("title", "ERROR PAGE");
		mav.setViewName(DEFAULT_ERROR_VIEW);
		return mav;
	}

	@ExceptionHandler(value = javax.validation.ConstraintViolationException.class)
	public String Validate(HttpServletRequest req, Exception e) throws Exception {

		// Otherwise setup and send the user to a default error-view.
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("exception", e);
//		mav.addObject("cause", e.getCause());
//		mav.addObject("message", e.getMessage());
//		mav.addObject("url", req.getRequestURL());
//		mav.addObject("title", "ERROR PAGE");
//		mav.setViewName(DEFAULT_ERROR_VIEW);
		return "redirect:" + req.getRequestURL();
	}
}
