// src/screens/UserList.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { GET } from "../api/services/api_service";
import { User } from "../api/types/types";
import ENV from "../../env.json";
import { ApiResponse } from "../api/services/api";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  {
    /* Fetch Latest Users */
  }
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<User[]> = await GET<User[]>(
        ENV.dev + "/users"
      );

      console.log("API Response:", response); // Debugging

      if (response.statusCode === "200" && response.data) {
        setUsers(response.data);
      } else {
        setError(`Error: ${response.statusCode}`);
      }
    } catch (err) {
      console.error("Fetch Error:", err); // Log
      setError("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ alignSelf: "center" }}
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchUsers} />
      </View>
    );
  }

  {
    /* TODO: Should be edited custom design */
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <FlatList
              data={item.games}
              keyExtractor={(game) => game._id}
              renderItem={({ item: game }) => (
                <View style={styles.gameContainer}>
                  <Text style={styles.gameName}>{game.name}</Text>
                  <Text>{game.description}</Text>
                  <Text>{game.genre}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
      <Button title="Refresh" onPress={fetchUsers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
  },
  gameContainer: {
    marginTop: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});

export default UserList;
