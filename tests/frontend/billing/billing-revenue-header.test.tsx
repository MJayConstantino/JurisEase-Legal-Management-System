import React from "react";
import { BillingsRevenueHeader } from '../../../src/components/billings/billingsRevenueHeader'
import { render, screen } from "@testing-library/react";

const revenueHeaderMockProps = {
    totalRevenue: 5000,
    todayRevenue: 250,
    weekRevenue: 400,
    monthRevenue: 1200,
    currentDateTime: new Date(),
    activeFilter: 'all',
    onFilterChange: jest.fn(),
};

describe('renders the (global) Billings page revenue header with data and time filters', () => {
    
    test('should render revenue header with "All" (Total) filter', () => {
        render(<BillingsRevenueHeader {...revenueHeaderMockProps} activeFilter="all" />);
        expect(screen.getByText('5,000')).toBeTruthy();
    });
    
    test('should render revenue header with "Today" filter', () => {
        render(<BillingsRevenueHeader {...revenueHeaderMockProps} activeFilter="today" />);
        expect(screen.getByText('250')).toBeTruthy();
    });
    
    test('should render revenue header with "Week" filter', () => {
        render(<BillingsRevenueHeader {...revenueHeaderMockProps} activeFilter="week" />);
        expect(screen.getByText('400')).toBeTruthy();
    });
    
    test('should render revenue header with "Month" filter', () => {
        render(<BillingsRevenueHeader {...revenueHeaderMockProps} activeFilter="month" />);
        expect(screen.getByText('1,200')).toBeTruthy();
    }); 
})