// describe("helper function", () => {
//     test("should return a true", () => {
//         const length = 3;
//         expect(length).toBe(3);
//     });
// });

// describe("object", () => {
//     test("should validate object", () => {
//         const data = { id: 1, name: "name" };
//         data.name = "anotherName";
//         expect(data).toEqual({ id: 1, name: "anotherName" });
//     });
// });

// // spying on a method
// const sampleObject = {
//     sayhello: () => {
//         console.log("hello");
//     },
// };

// describe("mock testing- spying ", () => {
//     const objSpy = jest.spyOn(sampleObject, "sayhello");
//     sampleObject.sayhello();
//     it("should be called once", () => {
//         expect(objSpy).toHaveBeenCalled();
//         expect(objSpy).toHaveBeenCalledTimes(1);
//         objSpy.mockClear();
//     });
// });

// const useServicesOBj = {
//     getUserName: (userId: string) => {
//         return `username: ${userId}`;
//     },
// };

// describe("mock testing- mocking functions", () => {
//     const serviceSpy = jest.spyOn(useServicesOBj, "getUserName");
//     serviceSpy.mockImplementation((userid: string) => {
//         return "hello world";
//     });
//     const result = useServicesOBj.getUserName("dfasdf");
//     it("spyon overrides method functionality with mock implementaitiont", () => {
//         expect(result).toBe("hello world");
//     });
//     serviceSpy.mockRestore(); // restore original functionality
// });
test.todo('sample')

/*
🚨 DOCUMENTATION BLOCK 🚨

1. Please mock the services or co functions used in your functions.
Things like createSupabaseClient should noT HIT the actual API because of the call limit 

2. Most of the tests are TESTING BUSINESS SIDE logic. Which means that what the client sends
to the backend. Or (request) BLOCK. Common errors in this include 400 Bad Request. 
If you opt to test the (response) BLOCK with the ACTUAL DB then make a DENO mock server endpoint
to simulate actual responses from our dtabase and eliminate false pasitives. 

3. Regarding integration tests: Handler functions and their respective server actions
may classify as an integration test. It's up to you whether you're up to testing your 
handlers with your server actions as long as you've unit testesd the server actions. 

4. If you want to focus on a test and skip all the others use the term 'fit' or focus on it
in your test block.  

fit('should do something), ()
 => {
 expect...}
 
 */
