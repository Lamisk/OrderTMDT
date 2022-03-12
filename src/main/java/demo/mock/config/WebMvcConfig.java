package demo.mock.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@EnableWebMvc
@Configuration
@ComponentScan(basePackages = "demo.mock")

// For multi component
//@ComponentScans({ 
//    @ComponentScan(basePackages = "pk1")), 
//    @ComponentScan(basePackageClasses = class1)
//})
public class WebMvcConfig implements WebMvcConfigurer {
	@Bean
	public InternalResourceViewResolver getViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setViewClass(JstlView.class);
		resolver.setPrefix("/jsp/");
		resolver.setSuffix(".jsp");
		
		return resolver;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/css/**").addResourceLocations("/resources/css/");
		registry.addResourceHandler("/js/**").addResourceLocations("/resources/js/");
		
	}

//	@Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new Interceptor()).addPathPatterns("/api/demo*/**");
//		 registry.addInterceptor(new Interceptor()).addPathPatterns("/**");
//	}
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("template/list");
	}
}
