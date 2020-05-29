package com.example.expense.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name="expense")
public class Expense {

	@Id
	private Long id;
	
	
	private Instant expensedate;
	
	
	private String description;
	
	
	private String location;
	
	@ManyToOne
	private Category category;
	
	
	@ManyToOne
	private User user;
	

}
