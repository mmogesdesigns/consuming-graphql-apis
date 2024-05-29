import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../queries & mutations/Mutation";
import { FormEvent, useRef } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const DeletePostPage = () => {
  const [deletePost, { loading, error, data }] = useMutation(DELETE_POST);

  const inputId = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputId.current) {
      deletePost({
        variables: {
          id: inputId.current.value,
        },
      });
      inputId.current.value = "";
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>Post ID: </Form.Label>
          <Form.Control type="text" ref={inputId} placeholder="Enter Post ID" />
        </Form.Group>
        <Button type="submit">Delete Post</Button>
      </Form>

      {data && (
        <Alert variant="success">
          <Alert.Heading>Post Deleted</Alert.Heading>
          <p>
            Post with ID {inputId.current?.value} has been deleted successfully.
          </p>
        </Alert>
      )}
    </Container>
  );
};

export default DeletePostPage;
