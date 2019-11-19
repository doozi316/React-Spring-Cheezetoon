package com.example.cheezetoon;

import java.util.TimeZone;

import javax.annotation.PostConstruct;
import javax.servlet.MultipartConfigElement;

import com.example.cheezetoon.config.FileStorageProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.web.multipart.MultipartResolver;

@SpringBootApplication
//자동 convert
@EntityScan(basePackageClasses = {DemoApplication.class, Jsr310JpaConverters.class})
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class DemoApplication {

	@PostConstruct
	void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public MultipartConfigElement multipartConfigElement() {
	MultipartConfigFactory factory = new MultipartConfigFactory();
	return factory.createMultipartConfig();
	}

	@Bean
	public MultipartResolver multipartResolver() {
	org.springframework.web.multipart.commons.CommonsMultipartResolver multipartResolver = new org.springframework.web.multipart.commons.CommonsMultipartResolver();
	multipartResolver.setMaxUploadSize(512000000);
	return multipartResolver;
	}

}
