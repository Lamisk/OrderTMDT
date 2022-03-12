package demo.mock.ultil;

import java.util.Random;

public class Ultil {
	public static Ultil ultil_instance = null;
	private final static String pattern = "123345789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private final static int patternLength = 8;

	public static Ultil getInstance() {
		if (ultil_instance == null)
			ultil_instance = new Ultil();

		return ultil_instance;
	}

	public String genCode() {
		String ret = "";
		Random r = new Random();
		for (int i = 0; i < patternLength; i++) {
			ret += pattern.charAt(r.nextInt(pattern.length()));
		}
		return ret;
	}
}
