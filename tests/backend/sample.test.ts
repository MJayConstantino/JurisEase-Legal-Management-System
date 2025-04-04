describe("helper function", () => {
    test("should return a true", () => {
        const length = 3;
        expect(length).toBe(3);
    });
});

describe("object", () => {
    test("should validate object", () => {
        const data = { id: 1, name: "name" };
        data.name = "anotherName";
        expect(data).toEqual({ id: 1, name: "anotherName" });
    });
});

// spying on a method
const sampleObject = {
    sayhello: () => {
        console.log("hello");
    },
};

describe("mock testing- spying ", () => {
    const objSpy = jest.spyOn(sampleObject, "sayhello");
    sampleObject.sayhello();
    it("should be called once", () => {
        expect(objSpy).toHaveBeenCalled();
        expect(objSpy).toHaveBeenCalledTimes(1);
        objSpy.mockClear();
    });
});

const useServicesOBj = {
    getUserName: (userId: string) => {
        return `username: ${userId}`;
    },
};

describe("mock testing- mocking functions", () => {
    const serviceSpy = jest.spyOn(useServicesOBj, "getUserName");
    serviceSpy.mockImplementation((userid: string) => {
        return "hello world";
    });
    const result = useServicesOBj.getUserName("dfasdf");
    it("spyon overrides method functionality with mock implementaitiont", () => {
        expect(result).toBe("hello world");
    });
    serviceSpy.mockRestore(); // restore original functionality
});
