package com.example.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.expense.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	
	//findBy + field(name)
	Category findByName(String name);
	
	

}
