
package demo.mock.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class AppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { JpaConfig.class };
		// return null;
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { WebMvcConfig.class };
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}
}

//public class AppInitializer implements WebApplicationInitializer {
//
//	@Override
//	public void onStartup(ServletContext servletContext) throws ServletException {
//		AnnotationConfigWebApplicationContext appContext = new AnnotationConfigWebApplicationContext();
//		appContext.register(newConfig.class);
//
//		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("SpringDispatcher",
//				new DispatcherServlet(appContext));
//		dispatcher.setLoadOnStartup(1);
//		dispatcher.addMapping("/");
//	}
//}