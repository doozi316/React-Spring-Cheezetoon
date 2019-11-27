package com.example.cheezetoon;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import com.example.cheezetoon.config.EpiThumbnailProperties;
import com.example.cheezetoon.config.EpiToonProperties;
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
	FileStorageProperties.class, EpiThumbnailProperties.class, EpiToonProperties.class
})
public class DemoApplication {

	@PostConstruct
	void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
