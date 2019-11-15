package com.example.cheezetoon.service.impl;
import java.util.Optional;

import javax.transaction.Transactional;

import com.example.cheezetoon.model.NewWebtoon;
import com.example.cheezetoon.payload.NewWebtoonDto;
import com.example.cheezetoon.repository.NewWebtoonRepository;
import com.example.cheezetoon.service.WebtoonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service(value="webtoonService")
public class WebtoonServiceImpl implements WebtoonService{

    @Autowired
    private NewWebtoonRepository newWebtoonRepository;

    @Override
	public NewWebtoon findById(Long id) {
		Optional<NewWebtoon> optionalNewWebtoon = newWebtoonRepository.findById(id);
		return optionalNewWebtoon.isPresent() ? optionalNewWebtoon.get() : null;
	}
    
    @Override
    public NewWebtoon save(NewWebtoonDto newWebtoonDto){
        NewWebtoon toon = findById(newWebtoonDto.getId());
        NewWebtoon newWebtoon = new NewWebtoon();
        newWebtoonDto.setTitle(toon.getTitle());
        newWebtoonDto.setArtist(toon.getArtist());
        newWebtoonDto.setGenre(toon.getGenre());
        newWebtoonDto.setDay(toon.getDay());
        newWebtoonDto.setThumbnail(toon.getThumbnail());
        return newWebtoonRepository.save(newWebtoon);

    }


}