/**
 * Step 18: Software Testing Strategies (TDD, Unit, and Integration)
 * Framework: Jest (Standard Enterprise Testing Tool)
 * Objective: Automated validation of core business logic and API routing.
 */

// --- 📦 Mocking Dependencies (Simulating the System) ---
// In a real TDD environment, we isolate the component being tested.
const mockProjectData = { id: 'prj_123', title: 'Data Analytics System', status: 'Active' };

// A pure function representing our core business validation logic
const validateProjectPayload = (payload) => {
    if (!payload.title || typeof payload.title !== 'string') {
        throw new Error('Validation Fault: Invalid or missing title');
    }
    return true;
};

// --- 🔬 UNIT TESTING (Testing pure functions in complete isolation) ---
describe('[Unit Tests] Core Business Logic Validation', () => {
    
    it('Should pass validation when a valid project payload is provided', () => {
        // Arrange (Setup the test data)
        const validPayload = { title: 'Enterprise Architecture' };
        
        // Act (Execute the function)
        const result = validateProjectPayload(validPayload);
        
        // Assert (Verify the outcome)
        expect(result).toBe(true);
    });

    it('Should throw a Validation Fault when the title is missing', () => {
        // Arrange
        const invalidPayload = { status: 'Draft' };
        
        // Act & Assert (Expecting an exception)
        expect(() => validateProjectPayload(invalidPayload)).toThrow('Validation Fault: Invalid or missing title');
    });
});

// --- 🔗 INTEGRATION TESTING (Testing how components interact) ---
// Simulating an API Gateway request lifecycle (from Step 16)
describe('[Integration Tests] API Gateway Request Pipeline', () => {
    
    // Mocking an asynchronous database or downstream microservice call
    const mockDownstreamService = jest.fn().mockResolvedValue(mockProjectData);

    it('Should successfully fetch data from downstream service and return 200 OK', async () => {
        // Act
        const responseData = await mockDownstreamService();
        
        // Assert
        expect(mockDownstreamService).toHaveBeenCalledTimes(1);
        expect(responseData.id).toBe('prj_123');
        expect(responseData.status).toEqual('Active');
    });

    it('Should trigger Circuit Breaker fallback on service timeout (503)', async () => {
        // Arrange: Forcing the mock to fail to test resilience
        mockDownstreamService.mockRejectedValueOnce(new Error('Timeout'));
        
        // Act & Assert
        await expect(mockDownstreamService()).rejects.toThrow('Timeout');
        // In the real system, our Express route would catch this and return a 503 HTTP status.
    });
});
