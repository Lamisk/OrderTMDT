package demo.mock.model;

public enum Gender {
	MALE("male"), FEMALE("female");

	private String alias;

	Gender(String alias) {
		this.alias = alias;
		// TODO Auto-generated constructor stub
	}

	public static Gender getGenderByAlias(String alias) {
		for (Gender gender : Gender.values()) {
			if (gender.alias.equals(alias)) {
				return gender;
			}
		}
		return null;
	}
}
