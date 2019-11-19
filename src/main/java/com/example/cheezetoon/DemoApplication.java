package com.example.cheezetoon;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import com.example.cheezetoon.config.FileStorageProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;


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

}
