import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TicketsService } from './tickets.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Ticket } from './ticket.model';
import { provideHttpClient } from '@angular/common/http';

describe('TicketService', () => {
  let service: TicketsService;
  let apiUrl = 'http://localhost:3000/api/tickets';

  // Helper function to create mock tickets
  const createMockTicket = (
    id: number,
    overrides?: Partial<Ticket>
  ): Ticket => ({
    id,
    title: `Test Ticket ${id}`,
    description: `Description for ticket ${id}`,
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  // Mock -> Simulación o falsificación de algo
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TicketsService,
      ],
    });
    service = TestBed.inject(TicketsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', fakeAsync(() => {
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
    tick();

    expect(service).toBeTruthy();
  }));

  it('should have correct initial state', fakeAsync(() => {
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
    tick();

    expect(service.tickets()).toEqual([]);
    expect(service.loaded()).toBe(true);
    expect(service.error()).toBeNull();
    expect(service.filter()).toEqual({ status: 'all', searchTerm: '' });
    expect(service.sort()).toEqual({ field: 'createdAt', direction: 'asc' });
  }));

  describe('Fetch Tickets', () => {
    it('should fetch initial tickets', fakeAsync(() => {
      // Simulacion/falsificación de tickets
      const mockTickets: Ticket[] = [createMockTicket(1), createMockTicket(2)];

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTickets);
      tick();

      expect(service.tickets()).toEqual(mockTickets);
      expect(service.tickets().length).toBe(2);
      expect(service.loaded()).toBe(true);
      expect(service.error()).toBeNull();
    }));

    it('should handle error when fetching tickets', fakeAsync(() => {
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      const errorMessage = 'Failed to fetch tickets';
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
      tick();

      expect(service.loaded()).toBe(true);
      expect(service.tickets().length).toBe(0);
      expect(service.error()).toBe(errorMessage);
    }));
  });

  describe('Create Ticket', () => {
    beforeEach(fakeAsync(() => {
      const initReq = httpMock.expectOne(apiUrl);
      initReq.flush([]);
      tick();
    }));

    it('should add a new ticket to the state via createTicket$', fakeAsync(() => {
      // TODO: Test adding a new ticket. Steps:
      // 1. Define a new ticket DTO (CreateTicketDto).
      // 2. Define the expected created ticket (Ticket) that the API would return (including ID, dates).
      // 3. Trigger the createTicket$ subject with the DTO.
      // 4. Use tick() to simulate the passage of time for async operations.
      // 5. Expect a POST request to the API URL (httpMock.expectOne).
      // 6. Check if the request method is POST and the body matches the DTO.
      // 7. Flush the request with the mock created ticket.
      // 8. Use tick() again.
      // 9. Assert that the service.tickets() signal now contains the created ticket.
      // 10. Assert that the service.error() signal is null.
    }));

    it('should handle error when creating a ticket', fakeAsync(() => {
      // TODO: Test error handling during ticket creation. Steps:
      // 1. Define a new ticket DTO.
      // 2. Define an error message string.
      // 3. Trigger the createTicket$ subject with the DTO.
      // 4. Use tick().
      // 5. Expect a POST request to the API URL.
      // 6. Flush the request with an error status (e.g., { status: 500, statusText: 'Server Error' }).
      // 7. Use tick().
      // 8. Assert that the service.tickets() signal is still empty.
      // 9. Assert that the service.error() signal contains the expected error message ('Failed to create ticket').
    }));
  });

  describe('Update Ticket', () => {
    beforeEach(fakeAsync(() => {
      const initialTicket = createMockTicket(1);
      const initReq = httpMock.expectOne(apiUrl);
      initReq.flush([initialTicket]); // Start with one ticket
      tick();
    }));

    it('should update an existing ticket in the state via updateTicket$', fakeAsync(() => {
      // TODO: Test updating an existing ticket. Steps:
      // 1. Get the initial ticket from the service state (service.tickets()[0]).
      // 2. Define an update DTO (UpdateTicketDto) with the changes.
      // 3. Define the expected updated ticket (Ticket) that the API would return.
      // 4. Trigger the updateTicket$ subject with the ticket ID and the update DTO.
      // 5. Use tick().
      // 6. Expect a PUT request to the specific ticket API URL (`${apiUrl}/${ticketToUpdate.id}`).
      // 7. Check if the request method is PUT and the body matches the update DTO.
      // 8. Flush the request with the mock updated ticket.
      // 9. Use tick().
      // 10. Assert that the service.tickets() signal contains the updated ticket (check properties like title).
      // 11. Assert that the service.error() signal is null.
    }));

    it('should handle error when updating a ticket', fakeAsync(() => {
      // TODO: Test error handling during ticket update. Steps:
      // 1. Get the initial ticket from the service state.
      // 2. Define an update DTO.
      // 3. Define an error message string.
      // 4. Trigger the updateTicket$ subject with the ticket ID and DTO.
      // 5. Use tick().
      // 6. Expect a PUT request to the specific ticket API URL.
      // 7. Flush the request with an error status.
      // 8. Use tick().
      // 9. Assert that the ticket in the service.tickets() signal has NOT changed (e.g., title is the original title).
      // 10. Assert that the service.error() signal contains the expected error message ('Failed to update ticket').
    }));
  });

  describe('Change Status', () => {
    beforeEach(fakeAsync(() => {
      const initialTicket = createMockTicket(1, { status: 'open' });
      const initReq = httpMock.expectOne(apiUrl);
      initReq.flush([initialTicket]);
      tick();
    }));

    it('should update ticket status via changeStatus$', fakeAsync(() => {
      // TODO: Test changing the status of a ticket. Steps:
      // 1. Get the initial ticket from the service state.
      // 2. Define the new status ('closed').
      // 3. Define the expected updated ticket (Ticket) with the new status.
      // 4. Trigger the changeStatus$ subject with the ticket and the new status.
      // 5. Use tick().
      // 6. Expect a PUT request to the specific ticket API URL.
      // 7. Check if the request method is PUT and the body contains the new status.
      // 8. Flush the request with the mock updated ticket.
      // 9. Use tick().
      // 10. Assert that the ticket in the service.tickets() signal has the new status.
      // 11. Assert that the service.error() signal is null.
    }));

    it('should handle error when changing status', fakeAsync(() => {
      // TODO: Test error handling during status change. Steps:
      // 1. Get the initial ticket from the service state.
      // 2. Define the new status.
      // 3. Define an error message string.
      // 4. Trigger the changeStatus$ subject with the ticket and new status.
      // 5. Use tick().
      // 6. Expect a PUT request to the specific ticket API URL.
      // 7. Flush the request with an error status.
      // 8. Use tick().
      // 9. Assert that the ticket in the service.tickets() signal still has the original status.
      // 10. Assert that the service.error() signal is null (Note: the service currently doesn't set error on status change failure, this might be a point of discussion or a bug in the service implementation).
    }));
  });

  describe('Delete Ticket', () => {
    beforeEach(fakeAsync(() => {
      const initialTicket = createMockTicket(1);
      const initReq = httpMock.expectOne(apiUrl);
      initReq.flush([initialTicket]);
      tick(); // Added tick to ensure state is updated before test runs
    }));

    it('should remove a ticket from the state via deleteTicket$', fakeAsync(() => {
      // TODO: Test deleting a ticket. Steps:
      // 1. Get the initial ticket from the service state.
      // 2. Trigger the deleteTicket$ subject with the ticket to delete.
      // 3. Use tick().
      // 4. Expect a DELETE request to the specific ticket API URL.
      // 5. Check if the request method is DELETE.
      // 6. Flush the request with a success status (e.g., 204 No Content).
      // 7. Use tick().
      // 8. Assert that the service.tickets() signal is now empty.
      // 9. Assert that the service.error() signal is null.
    }));

    it('should handle error when deleting a ticket', fakeAsync(() => {
      // TODO: Test error handling during ticket deletion. Steps:
      // 1. Get the initial ticket from the service state.
      // 2. Define an error message string.
      // 3. Trigger the deleteTicket$ subject with the ticket to delete.
      // 4. Use tick().
      // 5. Expect a DELETE request to the specific ticket API URL.
      // 6. Flush the request with an error status.
      // 7. Use tick().
      // 8. Assert that the service.tickets() signal still contains the original ticket.
      // 9. Assert that the service.error() signal contains the expected error message ('Failed to delete ticket').
    }));
  });

  describe('Filtering and Sorting', () => {
    const ticket1 = createMockTicket(1, {
      title: 'Alpha Open',
      status: 'open',
      createdAt: new Date(2025, 3, 20),
    });
    const ticket2 = createMockTicket(2, {
      title: 'Beta Closed',
      status: 'closed',
      createdAt: new Date(2025, 3, 22),
    });
    const ticket3 = createMockTicket(3, {
      title: 'Gamma Open',
      status: 'open',
      createdAt: new Date(2025, 3, 21),
      description: 'Search Me Please', // Set unique description for filtering test
    });

    beforeEach(fakeAsync(() => {
      const initReq = httpMock.expectOne(`${apiUrl}`);
      initReq.flush([ticket1, ticket2, ticket3]); // Start with three tickets
      tick();
    }));

    it('should update filter state via filterChange$', () => {
      // TODO: Test updating the filter state. Steps:
      // 1. Define a new filter object (Filter).
      // 2. Trigger the filterChange$ subject with the new filter.
      // 3. Assert that the service.filter() signal now equals the new filter object.
    });

    it('should filter tickets by status', () => {
      // TODO: Test filtering tickets by status ('open', 'closed', 'all'). Steps:
      // 1. Trigger filterChange$ with { status: 'open', searchTerm: '' }. Assert the filtered tickets (service.tickets()) are correct (check length and IDs).
      // 2. Trigger filterChange$ with { status: 'closed', searchTerm: '' }. Assert the filtered tickets are correct.
      // 3. Trigger filterChange$ with { status: 'all', searchTerm: '' }. Assert all tickets are returned.
    });

    it('should filter tickets by search term (title)', () => {
      // TODO: Test filtering tickets by a search term matching the title. Steps:
      // 1. Trigger filterChange$ with { status: 'all', searchTerm: 'beta' } (or another term).
      // 2. Assert that only the ticket(s) with matching titles are returned in service.tickets().
    });

    it('should filter tickets by search term (description - case insensitive)', () => {
      // TODO: Test filtering tickets by a search term matching the description (case-insensitive). Steps:
      // 1. Trigger filterChange$ with { status: 'all', searchTerm: 'search me' } (use different casing).
      // 2. Assert that only the ticket(s) with matching descriptions are returned in service.tickets().
    });

    it('should filter tickets by status and search term', () => {
      // TODO: Test filtering tickets by both status and search term. Steps:
      // 1. Trigger filterChange$ with { status: 'open', searchTerm: 'alpha' }.
      // 2. Assert that only the ticket(s) matching both criteria are returned in service.tickets().
    });

    it('should update sort state via sortChange$', () => {
      // TODO: Test updating the sort state. Steps:
      // 1. Define a new sort object (Sort).
      // 2. Trigger the sortChange$ subject with the new sort object.
      // 3. Assert that the service.sort() signal now equals the new sort object.
    });

    it('should sort tickets by title ascending', () => {
      // TODO: Test sorting tickets by title ascending. Steps:
      // 1. Trigger sortChange$ with { field: 'title', direction: 'asc' }.
      // 2. Assert that the service.tickets() signal returns tickets sorted alphabetically by title (check the order of titles).
    });

    it('should sort tickets by title descending', () => {
      // TODO: Test sorting tickets by title descending. Steps:
      // 1. Trigger sortChange$ with { field: 'title', direction: 'desc' }.
      // 2. Assert that the service.tickets() signal returns tickets sorted reverse-alphabetically by title.
    });

    it('should sort tickets by createdAt descending (default is asc)', () => {
      // TODO: Test sorting tickets by creation date descending. Steps:
      // 1. Trigger sortChange$ with { field: 'createdAt', direction: 'desc' }.
      // 2. Assert that the service.tickets() signal returns tickets sorted by newest first (check the order of IDs).
    });

    it('should sort tickets by status ascending', () => {
      // TODO: Test sorting tickets by status ascending. Steps:
      // 1. Trigger sortChange$ with { field: 'status', direction: 'asc' }.
      // 2. Assert that the service.tickets() signal returns tickets sorted alphabetically by status (check the order of IDs based on status: closed, open, open).
    });
  });
});
