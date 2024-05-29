
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../queries & mutations/Mutation";
import { FormEvent, useRef } from "react";
import { Spinner, Alert,Form,Container, Button } from "react-bootstrap";


const UpdatePostPage = () => {
  const [updatePost, { loading, error, data }] = useMutation(UPDATE_POST);

  const inputId = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputId.current && inputBody.current) {
      updatePost({
        variables: {
          id: inputId.current.value,
          body: inputBody.current.value,
        },
      });
      inputId.current.value = "";
      inputBody.current.value = "";
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

        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body: </Form.Label>
          <Form.Control type="text" ref={inputBody} placeholder="Enter Body" />
        </Form.Group>
        <Button type="submit">Update Post</Button>
      </Form>

      {data && data.updatePost && (
        <div>
          <h1>Updated Post</h1>
          <p>ID: {data.updatePost.id}</p>
          <p>Body: {data.updatePost.body}</p>
        </div>
      )}
    </Container>
  );
};

export default UpdatePostPage;
