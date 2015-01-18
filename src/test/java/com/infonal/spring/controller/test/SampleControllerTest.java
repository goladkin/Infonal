package com.infonal.spring.controller.test;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.infonal.UserServiceImpl.UserService;
import com.infonal.spring.controller.SampleController;

@WebAppConfiguration
public class SampleControllerTest {

	@InjectMocks
	SampleController controller;

	@Mock
	UserService mockUserService;

	private MockMvc mockMvc;

	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
	}

	@Test
	public void testSampleControllerGetUserList() {
		try {
			this.mockMvc
					.perform(MockMvcRequestBuilders.get("/users"))
					.andExpect(MockMvcResultMatchers.status().isOk())
					.andExpect(
							MockMvcResultMatchers.model().attributeExists(
									"userList"))
					.andExpect(MockMvcResultMatchers.view().name("index"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
