      <div><button></button></div>
      <div>
        <% if (user) { %>
          <% if (profile && profile.isInstructor) { %>
            <a href="/instruments">EDIT INSTRUMENTS</a>

            <% } %>
              <a href="/logout" class="login">LOG OUT</a>
              <% } else { %>
                <a href="/auth/google" class="login">LOG IN<img src="https://i.imgur.com/FHjYyi0.png"></a>
                <% } %>
      </div>