import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { server } from '../mocks/server';
import {
  mockedContactInfo,
  mockedContactInfoWithInvalidPhone,
  mockedContactInfoWithInvalidThumbnail,
} from './mockData';

describe('App', () => {
  it('should filter record and do not show any contact info when record not found', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockedContactInfo));
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    await userEvent.type(screen.getByRole('textbox'), 'Susfrs');

    // avatar
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('should not show any record if api returns no data', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ results: [] }));
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    // avatar
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('should display name and phone if image is invalid', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...mockedContactInfo,
            results: [
              {
                ...mockedContactInfoWithInvalidThumbnail,
                picture: {
                  ...mockedContactInfoWithInvalidThumbnail.picture,
                  thumbnail: 'http:',
                },
              },
              ...mockedContactInfo.results,
            ],
          })
        );
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    expect(await screen.findByText('Carolyn')).toBeInTheDocument();
    expect(await screen.findByText('015396 78962')).toBeInTheDocument();
  });

  it('should not display image if invalid', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...mockedContactInfo,
            results: [
              {
                ...mockedContactInfoWithInvalidThumbnail,
                picture: {
                  ...mockedContactInfoWithInvalidThumbnail.picture,
                  thumbnail: 'http:',
                },
              },
              ...mockedContactInfo.results,
            ],
          })
        );
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    expect(await screen.findAllByRole('img')).toHaveLength(4);
  });

  it('should display name if phone number greater than 14 characters', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...mockedContactInfo,
            results: [
              mockedContactInfoWithInvalidPhone,
              ...mockedContactInfo.results,
            ],
          })
        );
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    expect(await screen.findByText('Carolyn')).toBeInTheDocument();
  });

  it('should not display phone number if greater than 14 characters', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...mockedContactInfo,
            results: [
              mockedContactInfoWithInvalidPhone,
              ...mockedContactInfo.results,
            ],
          })
        );
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    await waitFor(async () => {
      const contactListWrapper = await screen.findByTestId(
        'user-contact-list-wrapper'
      );
      expect(contactListWrapper.children).toHaveLength(5);
    });

    expect(
      screen.queryByText('015396 78962 4534 543354')
    ).not.toBeInTheDocument();
  });

  it('should display name if phone number less than 8 characters', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...mockedContactInfo,
            results: [
              {
                ...mockedContactInfoWithInvalidPhone,
                phone: '3334445',
              },
              ...mockedContactInfo.results,
            ],
          })
        );
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    expect(await screen.findByText('Carolyn')).toBeInTheDocument();
  });

  it('should not display phone number less than 8 characters', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...mockedContactInfo,
            results: [
              {
                ...mockedContactInfoWithInvalidPhone,
                phone: '3334445',
              },
              ...mockedContactInfo.results,
            ],
          })
        );
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    await waitFor(async () => {
      const contactListWrapper = await screen.findByTestId(
        'user-contact-list-wrapper'
      );
      expect(contactListWrapper.children).toHaveLength(5);
    });

    expect(screen.queryByText('3334445')).not.toBeInTheDocument();
  });

  it('should have id attribute in contact info wrapper', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockedContactInfo));
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    await waitFor(async () => {
      const contactListWrapper = await screen.findByTestId(
        'user-contact-list-wrapper'
      );
      expect(contactListWrapper.children).toHaveLength(5);

      Object.entries(contactListWrapper.children).forEach(([key, value]) => {
        expect(value.getAttribute('id')).toBeDefined();
      });
    });
  });

  it('should have unique id attribute in contact info wrapper', async () => {
    server.use(
      rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockedContactInfo));
      })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sync' }));

    await waitFor(async () => {
      const contactListWrapper = await screen.findByTestId(
        'user-contact-list-wrapper'
      );
      expect(contactListWrapper.children).toHaveLength(5);

      const id: any = [];

      Object.entries(contactListWrapper?.children)?.forEach(([key, value]) => {
        id.push(value.getAttribute('id'));
      });

      const removeDuplicates = new Set(id);

      expect(removeDuplicates?.size === id?.length).toBe(true);
    });
  });
});
