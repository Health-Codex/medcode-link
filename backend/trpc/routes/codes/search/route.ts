import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    query: z.string().optional(),
    type: z.enum(['CPT', 'ICD-10', 'All']).optional().default('All'),
    limit: z.number().min(1).max(100).optional().default(20)
  }))
  .query(({ input }) => {
    // Mock search functionality
    // In a real app, this would query a database
    const mockResults = [
      {
        id: '1',
        code: '99213',
        description: 'Office visit for established patient',
        type: 'CPT' as const,
        coverage: {
          status: 'Covered' as const,
          insurance: 'Both' as const
        }
      },
      {
        id: '2', 
        code: 'E11.9',
        description: 'Type 2 diabetes mellitus without complications',
        type: 'ICD-10' as const,
        coverage: {
          status: 'Covered' as const,
          insurance: 'Both' as const
        }
      }
    ];

    // Simple filtering based on input
    let filteredResults = mockResults;
    
    if (input.query) {
      filteredResults = mockResults.filter(code => 
        code.code.toLowerCase().includes(input.query!.toLowerCase()) ||
        code.description.toLowerCase().includes(input.query!.toLowerCase())
      );
    }
    
    if (input.type !== 'All') {
      filteredResults = filteredResults.filter(code => code.type === input.type);
    }

    return {
      codes: filteredResults.slice(0, input.limit),
      total: filteredResults.length,
      query: input.query || '',
      type: input.type
    };
  });