package api

// To be able to run the test you must generate the Server - see Generating Code From Spec in Readme.
//
// This test is for demonstration purposes to understand the handler req/res param flow.

import (
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

// testServer implements the generated ServerInterface for testing.
type testServer struct{}

// Join demonstrates how to implement the ServerInterface and read params.
func (s *testServer) Join(w http.ResponseWriter, r *http.Request, params JoinParams) {
	_, _ = w.Write([]byte(createJoinedTopicRes(params.Topic)))
}

func (s *testServer) Discovery(w http.ResponseWriter, r *http.Request) {
}

func (s *testServer) FilterPeerID(w http.ResponseWriter, r *http.Request, params FilterPeerIDParams) {
}

func (s *testServer) Leave(w http.ResponseWriter, r *http.Request, params LeaveParams) {
}

func (s *testServer) List(w http.ResponseWriter, r *http.Request, params ListParams) {
}

func (s *testServer) Publish(w http.ResponseWriter, r *http.Request, params PublishParams) {
}

func (s *testServer) Read(w http.ResponseWriter, r *http.Request, params ReadParams) {
}

func (s *testServer) ReadAll(w http.ResponseWriter, r *http.Request, params ReadAllParams) {
}

// TestJoin showcases how to use the auto-generated server, access req params, etc.
func TestJoin(t *testing.T) {
	srv := &testServer{}
	handler := Handler(srv)
	ts := httptest.NewServer(handler)
	defer ts.Close()

	topic := "mytestopic"
	resp, err := http.Post(fmt.Sprintf(ts.URL+"/join?topic=%v", topic), "", nil)
	if err != nil {
		t.Fatalf("failed to send join request: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	expBody := createJoinedTopicRes(topic)
	if string(body) != expBody {
		t.Errorf("expected response %q, got %q", expBody, string(body))
	}
}

func createJoinedTopicRes(topic string) string {
	return fmt.Sprintf("Joined topic: %v", topic)
}
